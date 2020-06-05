import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genero, Categoria } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genero[] = [];

  favoritoPorGenero: Categoria[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private movieServie: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarPeliculasFavoritas();
    this.generos = await this.movieServie.getGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero( genero: Genero[], peliculas: PeliculaDetalle[] ) {
    this.favoritoPorGenero = [];

    this.generos.forEach(genero => {
      this.favoritoPorGenero.push({
        genero: genero.name,
        peliculas: peliculas.filter(pelicula => {
          return pelicula.genres.find(genre => genre.id === genero.id);
        })
      });
    });
  }

}
