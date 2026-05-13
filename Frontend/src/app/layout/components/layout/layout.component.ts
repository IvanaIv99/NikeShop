import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('tm-customer');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('tm-customer');
  }
}
