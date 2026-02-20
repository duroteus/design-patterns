export class ExternalEmailService {
  dispatchEmail(payload: { content: string }) {
    console.log("External provider delivering email:", payload.content);
  }
}
