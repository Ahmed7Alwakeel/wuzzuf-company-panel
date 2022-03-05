import { Component, Input, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
@Component({
  selector: 'details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {

  constructor() { }

  @Input('title') title!: string;
  @Input('subtitle') subtitle!: string;
  @Input('content') content!: string;
  @Input('tooltip') tooltip!: string;
  @Input('tooltipPosition') tooltipPosition!:TooltipPosition;

  ngOnInit(): void {
  }

}
