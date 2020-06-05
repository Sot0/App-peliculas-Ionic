import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    // slidesPerView: 3.3,
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

  cargarMasPeliculas() {
    this.cargarMas.emit();
  }

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
