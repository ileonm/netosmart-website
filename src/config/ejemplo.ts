/**
 * El día de diez horas de ejemplo. ILUSTRATIVO: no son datos medidos ni un
 * promedio. Lo usan el inicio y la guía de cuánto gana de verdad un
 * conductor, para que los dos digan siempre los mismos números.
 */
export const ejemplo = {
  horas: 10,
  bruto: 58400,
  gastos: [
    { concepto: 'Gasolina (unos 17 litros)', monto: 13500 },
    { concepto: 'Peajes que pagaste vos', monto: 1800 },
    { concepto: 'Apartado de mantenimiento y llantas', monto: 4200 },
    { concepto: 'Costos fijos (seguro, marchamo, la cuota del carro)', monto: 5300 },
  ],
};

export const totalGastos = ejemplo.gastos.reduce((s, g) => s + g.monto, 0);
export const neto = ejemplo.bruto - totalGastos;
export const porHora = Math.round(neto / ejemplo.horas);
