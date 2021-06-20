import { ReactComponent as AppLogo } from '../../assets/logo.svg';

import * as S from './styles';

export const Header = () => {
  return (
    <S.Container>
      <S.Content>
        <AppLogo />
        <button type="button">Nova transação</button>
      </S.Content>
    </S.Container>
  );
};
