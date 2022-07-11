import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    email: '',
    phone: '',
    mess:''
  };
  submitted = true;
  constructor(private formBuilder: FormBuilder) { }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnInit(): void {
  
  this.Form = this.formBuilder.group({
    phone: ['', [ Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
    name:'',
    email:'',
    mess:''
    });

  }
  get f() { return this.Form.controls; }
  onSubmit() {
    if (this.Form.invalid) {
      return;
    }
    else
    {
     this.submitted= true;
     this.user.email=this.Form.get('email').value;
     this.user.name=this.Form.get('name').value;
     this.user.phone=this.Form.get('phone').value;
     this.user.mess=this.Form.get('mess').value;
      this.Form.reset();
    }
  }
}
