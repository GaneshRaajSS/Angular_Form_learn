import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidationErrors } from '@angular/forms';
 
function vMsg(control: FormControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.trim().toLowerCase() !== 'nil' && value.split(' ').length < 50) {
    return { invalidMessage: true };
  }
  return null;
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {
  title = 'Angular Reactive Form';
  submitted = false;
  
  myform = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    msgText: new FormControl('', [Validators.required,vMsg]),
    mobNo: new FormControl('', [Validators.required, Validators.pattern('^[+]?[0-9 ]*$')]),
    // fileUpload: new FormControl('', [Validators.required])
  });

  preview:String = " ";

  submitForm() {
    this.submitted = true;

    if (this.myform.valid) {
      console.log('Form submitted successfully.');
    
      this.preview = `<strong>Name:</strong> ${this.myform.get('userName')?.value}<br>`+
      `<strong>Email:</strong> ${this.myform.get('emailId')?.value}<br>`+
      `<strong>Message:</strong> ${this.myform.get('msgText')?.value}<br>`+
      `<strong>Phone Number:</strong> ${this.myform.get('mobNo')?.value}<br>`;

      this.myform.reset();
      this.submitted = false;
    } else {
      Object.values(this.myform.controls).forEach((control) => {
          control.markAsTouched();
          console.log("click");
      });
    }

    

  }

  get userName() {
    return this.myform.get('userName');
  }

  get emailId() {
    return this.myform.get('emailId');
  }

  get msgText() {
    return this.myform.get('msgText');
  }

  get mobNo() {
    return this.myform.get('mobNo');
  }
  // get fileUpload() {
  //   return this.myform.get('fileUpload');
  // }
}
