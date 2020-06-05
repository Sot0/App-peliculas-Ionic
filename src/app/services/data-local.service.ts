import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.cargarPeliculasFavoritas()
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {
    let existe: boolean = false;
    let mensaje: string = '';

    for(const peli of this.peliculas) {
      if(peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if(existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.mostrarToast(mensaje);
    this.storage.set('peliculasAPI', this.peliculas);

    return !existe;
  }

  async cargarPeliculasFavoritas() {
    this.peliculas = await this.storage.get('peliculasAPI') || [];
    return this.peliculas;
  }

  async existePelicula( id ) {
    id = Number(id);
    
    await this.cargarPeliculasFavoritas();
    const existe = this.peliculas.find(peli => peli.id === id);

    return existe ? true: false;
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      mode: 'ios'
    });
    toast.present();
  }

}
