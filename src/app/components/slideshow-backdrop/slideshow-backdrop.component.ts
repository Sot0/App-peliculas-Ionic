import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    // slidesPerView: 1.2,
    freeMode: true,
    breakpoints: {
      320: {
        slidesPerView: 1.3,
      },
      640: {
        slidesPerView: 2.2,
      },
      1000: {
        slidesPerView: 2.2,
      },
      1200: {
        slidesPerView: 4.3,
      }
    }
  };

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async verDetalle( id: string ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
