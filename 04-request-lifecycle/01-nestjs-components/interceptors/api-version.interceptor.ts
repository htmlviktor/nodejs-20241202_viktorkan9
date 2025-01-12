import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        console.log(`Execution time: ${endTime - startTime}ms`);
      }),
      map((data) => {
        const endTime = Date.now();
        const executionTime = `${endTime - startTime}ms`; // Преобразуем в строку с "ms"

        return {
          ...data,
          apiVersion: "1.0",
          executionTime,
        };
      }),
    );
  }
}
