import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Fecha } from '../fechas.model';
import { FechasService } from '../fechas.service';

@Component({
  selector: 'app-detail-fecha',
  templateUrl: './detail-fecha.page.html',
  styleUrls: ['./detail-fecha.page.scss'],
})
export class DetailFechaPage implements OnInit, OnDestroy {

  fechaActual: Fecha;
  fechaSub: Subscription;

  constructor(private activeRoute: ActivatedRoute, private navCtrl: NavController, private fechaService: FechasService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( paramMap => {
      if(!paramMap.has("fechaId")){
        this.navCtrl.navigateBack("/fechas");
        return;
      }
      this.fechaSub = this.fechaService.getFecha(paramMap.get("fechaId")).subscribe( fecha => {
        this.fechaActual = fecha;
      })
    })
  }

  ngOnDestroy(){
    if(this.fechaSub){
      this.fechaSub.unsubscribe();
    }
  }
}
