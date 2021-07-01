import { ReactComponent as AppLogo } from '../../assets/logo.svg';

import * as S from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {

  return (
    <S.Container>
      <S.Content>
        <AppLogo />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </S.Content>
    </S.Container>
  );
};
