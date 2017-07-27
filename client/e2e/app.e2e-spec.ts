import { PlannerFrontEndPage } from './app.po';

describe('planner-front-end App', () => {
  let page: PlannerFrontEndPage;

  beforeEach(() => {
    page = new PlannerFrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
