import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('title') title!: string;
  @Input('link') link!: string;
  @Input('numbers') numbers!: string;
  @Input('icon') icon!: string;
  @Input('params') params!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
