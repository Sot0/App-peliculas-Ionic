import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagenUrl: string, size: string = 'w500'): string {
    if(!imagenUrl) return 'assets/no-img-banner.jpg';

    const imgUrl = `${url}/${size}${imagenUrl}`;

    return imgUrl;
  }

}
