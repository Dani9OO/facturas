import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailsRoutingModule } from './ticket-details-routing.module';
import { TicketDetailsComponent } from './ticket-details.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TicketDetailsComponent
  ],
  imports: [
    CommonModule,
    TicketDetailsRoutingModule,
    ZXingScannerModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TicketDetailsModule { }
