import { showQuickPick } from './showQuickPick';

export const showQuickPickYesOrNo = async (placeHolder) =>
  showQuickPick(placeHolder, ['No', 'Yes'])
    .then(selection => selection === 'Yes');