import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    freeMode: true,
    breakpoints: {
      320: {
        slidesPerView: 3.3,
      },
      640: {
        slidesPerView: 5.3,
      },
      1000: {
        slidesPerView: 6.3,
      },
      1200: {
        slidesPerView: 7.3,
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
