import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'form';
  Form: FormGroup;
  user = {
    name: '',
    mess: '',
  };
  phone:string[]=[];
  email:string[]=[];
  submitted = true;
  constructor(private formBuilder: FormBuilder) { }
  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPress(event: any) {
    const pattern = /^[a-z][A-Z]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  get f() { return this.Form.controls; }
  get emailArr():FormArray {
    return (this.Form.get('emailArr') as FormArray);
  }
  get phoneArr():FormArray {
    return (this.Form.get('phoneArr') as FormArray);
  }
  public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
    var invalidControls:string[] = [];
    let recursiveFunc = (form:FormGroup|FormArray) => {
      Object.keys(form.controls).forEach(field => { 
        const control = form.get(field);
        if (control.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }        
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
  ngOnInit(): void {
  this.Form = new FormGroup({
    phoneArr:new FormArray([]),
    name:new FormControl('',[Validators.required]),
    emailArr:new FormArray([]),
    mess:new FormControl('')
    });
   
  }
  
onAddPhone(){
  const control2 = new FormControl(null,[ Validators.required,
    Validators.pattern("[0-9 ]{10}"),
    ]);
  (<FormArray>this.Form.get('phoneArr')).push(control2);
}
  onAddEmail() {
    const control = new FormControl(null,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    (<FormArray>this.Form.get('emailArr')).push(control);
  }
  getControls(controlName:string) {
    return (this.Form.get(controlName) as FormArray).controls;
  }
  onSubmit() {
    
    this.submitted= true;

    if (this.Form.invalid) {
      return;
    }
    
    else
    {
      this.user.name = this.Form.get('name').value;
      this.user.mess = this.Form.get('mess').value;
      for(let i=0;i<this.emailArr.length;i++){
        this.email.push(this.emailArr.at(i).value);
      }
     
      for(let i=0;i<this.phoneArr.length;i++){
        this.phone.push(this.phoneArr.at(i).value);
      }
      this.Form.reset();
    }
  }
}
