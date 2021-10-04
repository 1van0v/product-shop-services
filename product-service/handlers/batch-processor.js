export const catalogBatchProcess = (event) => {
  event.Records.map(i => console.log('message', i.body));
}