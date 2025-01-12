import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const number = parseInt(value, 10);

    if (isNaN(number)) {
      throw new BadRequestException(`"${value}" не является числом`);
    }

    return number;
  }
}
