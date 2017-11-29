import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';
import { LanguagesGet } from '../services/languages-get.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  startDate = new Date('Nov 14 2018');
  hasPrimaryLanguageError = false;
  languages = [];
  model = new Employee("Mark","Zamoyta", true,"1099","default");

  constructor(private formPoster: FormPoster,private languagesGet: LanguagesGet){
    this.getLanguages();
  }

  firstNameToUpper(value) {
    if(value)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }

  validatePrimaryLanguage(value){
    if(value === "default")
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }

  submitForm(form : NgForm){
    //Validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);

    if(this.hasPrimaryLanguageError)
      return;


    this.formPoster.postEmployeeForm(this.model)
                    .subscribe(
                      data => console.log('success :', data),
                      err => console.log('error :', err)
                    );
  }

  getLanguages(){
    this.languagesGet.GetLanguages()
                    .subscribe(
                      data => {
                        console.log('success :', data);
                        this.languages = data.languages;
                    },
                      err => console.log('error :', err));
  }
}
