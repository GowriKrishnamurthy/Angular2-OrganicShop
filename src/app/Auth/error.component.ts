import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'error',
  template: `<h4 class="error">
              {{errorMessage}}
            </h4>`,
  styles: [`h4{color:red}`]
})
export class ErrorComponent implements OnInit {

  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['errorMessage'];
      }
    );
  }
}
