import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTMDB, IdiomaOriginal, PeliculaDetalle, RespuestaCredits, RespuestaBusquedaPelicula, RespuestaGeneros, Genero } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const urlTMDB = environment.urlTMDB;
const apiKeyTMDB = environment.apiKeyTMDB;
const apiLenguage: IdiomaOriginal = IdiomaOriginal.En;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage: number = 0;
  generos: Genero[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = urlTMDB + query;
    query += `&api_key=${apiKeyTMDB}&lenguage=${apiLenguage}&inclcude_image_language=${apiLenguage}`;
    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaTMDB>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if(mes < 10) mesString = '0' + mes;
    else mesString = mes;

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    const query = `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`;

    return this.ejecutarQuery<RespuestaTMDB>(query);
  }

  getPeliculaDetalle( id: string ) {
    const query = `/movie/${id}?test=1`;
    return this.ejecutarQuery<PeliculaDetalle>(query);
  }

  getActoresPelicula( id: string ) {
    const query = `/movie/${id}/credits?test=1`;
    return this.ejecutarQuery<RespuestaCredits>(query);
  }

  buscarPeliculas( pelicula: string ) {
    const query = `/search/movie?query=${pelicula}`;
    return this.ejecutarQuery<RespuestaBusquedaPelicula>(query);
  }

  async getGeneros(): Promise<Genero[]> {
    return new Promise(resolve => {
      const query = `/genre/movie/list?test=1`;
      return this.ejecutarQuery<RespuestaGeneros>(query)
      .subscribe( resp => {
          this.generos = resp.genres;
          resolve(this.generos);
      });
    })
  }

}
