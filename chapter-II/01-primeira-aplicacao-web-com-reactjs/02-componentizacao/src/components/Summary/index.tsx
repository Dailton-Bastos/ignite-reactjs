import { ReactComponent as IncomeIcon } from '../../assets/income.svg';
import { ReactComponent as OutcomeIcon } from '../../assets/outcome.svg';
import { ReactComponent as TotalIcon } from '../../assets/total.svg';

import * as S from './styles';

export const Summary = () => {
  return (
    <S.Container>
      <div>
        <header>
          <p>Entradas</p>
          <IncomeIcon />
        </header>
        <strong>R$ 1000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <OutcomeIcon />
        </header>
        <strong>-R$ 500,00</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <TotalIcon />
        </header>
        <strong>R$ 500,00</strong>
      </div>
    </S.Container>
  );
};
