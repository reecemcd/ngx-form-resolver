import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, takeUntil} from 'rxjs/operators';
import { FormControlResolver } from './form-resolver.models';

export class FormResolver<T> {

  private formGroup: FormGroup;
  private objectFactory: Function;
  private resolvers: { [key: string]: FormControlResolver<any> };

  private _stateSubject: Subject<any> = new Subject();
  private _updateSubject: Subject<any> = new Subject();
  private _stateSubjects: { [key: string]: Subject<any> } = {};

  constructor(formGroup: FormGroup, objectFactory: Function, resolverConfig: { [key: string]: FormControlResolver<any> }) {
    this.formGroup = formGroup;
    this.objectFactory = objectFactory;
    this.resolvers = resolverConfig;

    this.refreshResolver();
  }

  private refreshResolver() {
    // close old subscriptions
    this._updateSubject.next();

    // Control level changes
    Object.keys(this.formGroup.controls).forEach((key: string) => {
      const control: AbstractControl = this.formGroup.get(key);
      control.valueChanges.pipe(
          startWith(control.value),
          takeUntil(this._updateSubject.asObservable())
        ).subscribe(value => {
          if (!this._stateSubjects.hasOwnProperty(key)) {
            this._stateSubjects[key] = new Subject();
          }
          this._stateSubjects[key].next(value);
        });
    });

    // Group level changes
    this.formGroup.valueChanges.pipe(
        startWith(this.getFormStateSnapshot()),
        takeUntil(this._updateSubject.asObservable())
      ).subscribe(() => {
        this._stateSubject.next(this.getFormStateSnapshot());
      });
  }

  /**
   * Set a new FormGroup to watch
   * @param formGroup
   */
  public updateFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.refreshResolver();
  }

  /**
   * Set a new factory function
   * @param factory
   */
  public updateFactory(factory: Function) {
    this.objectFactory = factory;
  }

  /**
   * Pass in a completely new config of formControlNames and resolvers
   * @param resolverConfig
   */
  public updateResolverConfig(resolverConfig: { [key: string]: FormControlResolver<any> }) {
    this.resolvers = resolverConfig;
    this.refreshResolver();
  }

  /**
   * Adds a control to be watched and resolved
   * @param controlName
   * @param formControlResolver
   */
  public addControl(controlName: string, formControlResolver: FormControlResolver<any>) {
    this.resolvers[controlName] = formControlResolver;
    this.updateResolverConfig(this.resolvers);
  }

  /**
   * Alias to addControl
   * @param controlName
   * @param formControlResolver
   */
  public updateControl(controlName: string, formControlResolver: FormControlResolver<any>) {
    this.addControl(controlName, formControlResolver);
  }

  /**
   * Removes a control from being watched and resolved
   * @param controlName
   */
  public removeControl(controlName: string) {
    try { delete this.resolvers[controlName]; } catch (e) {}
    this.updateResolverConfig(this.resolvers);
  }

  /**
   * Maps an object to the form using the configured formControlResolvers
   * @param T object
   * @memberof FormResolver
   */
  public setFormState(object: T) {
    if (object !== null && object !== undefined) {
      Object.keys(this.formGroup.controls).forEach((key: string) => {
        const control: AbstractControl = this.formGroup.get(key);
        if (this.resolvers.hasOwnProperty(key)) {
          const value = this.resolvers[key].inputResolver(object, key);
          // If this resolved value is not null set the control and mark it as dirty
          if (value !== null) {
            control.setValue(value);
            control.markAsDirty();
          }
          // If it is null then reset the control
          else {
            control.reset();
          }
        }
      });
    }
    else {
      this.formGroup.reset();
    }
  }

  /**
   * Returns an observable of the resolved state of the form
   * The new resolved state is emitted any time the form is changed
   * @returns Observable<T>
   * @memberof FormResolver
   */
  public getFormState(): Observable<T> {
    return this._stateSubject.asObservable();
  }

  /**
   * Returns the resolved state of the form as it is right now
   * @returns T
   * @memberof FormResolver
   */
  public getFormStateSnapshot(): T {
    let returnObject = this.objectFactory();
    Object.keys(this.formGroup.controls).forEach((key: string) => {
      if (this.resolvers.hasOwnProperty(key)) {
        returnObject = this.resolvers[key].outputResolver(returnObject, this.formGroup.value, key);
      }
    });
    return returnObject;
  }

  /**
   * Completes all form resolver subjects
   */
  public complete() {
    this._stateSubject.complete();
    this._updateSubject.complete();
    Object.keys(this._stateSubjects).forEach(key => {
      this._stateSubjects[key].complete();
    });
  }
}