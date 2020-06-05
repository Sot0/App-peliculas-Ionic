import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { SlideparesPipe } from './slidepares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    SlideparesPipe,
    FiltroImagenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    SlideparesPipe,
    FiltroImagenPipe
  ]
})
export class PipesModule { }
