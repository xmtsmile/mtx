import { MtxPage } from './app.po';

describe('mtx App', function() {
  let page: MtxPage;

  beforeEach(() => {
    page = new MtxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
