export class FakeDatabaseConnection {
  private static globalConnectionCounter = 0;
  public id: number;

  constructor() {
    FakeDatabaseConnection.globalConnectionCounter++;
    this.id = FakeDatabaseConnection.globalConnectionCounter;

    console.log(`📡 Abrindo conexão com o banco... (id=${this.id})`);
  }

  query(sql: string) {
    console.log(`Executando query na conexão ${this.id}: ${sql}`);
  }
}
