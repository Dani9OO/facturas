import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScannerComponent implements OnInit {

  public scannedString = '';
  public scannerEnabled = false;

  constructor(
    private data: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  boton(evt: MouseEvent) {
    this.scannerEnabled = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async handleScan(evt: string) {
    this.scannerEnabled = false;
    const uploaded = await this.data.newFactura(evt);
    if (uploaded instanceof Error) this.openSnackBar(uploaded.message, 'Error');
    if (typeof uploaded === 'string') this.openSnackBar(uploaded, '✓');
    this.scannedString = evt;
  }



}
