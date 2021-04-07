import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  readonly scannerFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128 ];
  public enabled = false;
  public scanned = '';

  constructor() { }

  ngOnInit(): void {

  }

  scanSuccessHandler(event: string) {
    this.scanned = event;
    this.enabled = false;
  }

  enableCamera() {
    this.enabled = true;
  }

}
