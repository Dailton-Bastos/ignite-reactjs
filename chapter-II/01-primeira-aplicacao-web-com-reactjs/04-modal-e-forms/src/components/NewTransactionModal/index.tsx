import React from 'react';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as IncomeIcon } from "../../assets/income.svg";
import { ReactComponent as OutcomeIcon } from "../../assets/outcome.svg";

import * as S from './styles'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {

  const [title, setTitle] = React.useState('')
  const [value, setValue] = React.useState(0)
  const [category, setCategory] = React.useState('')
  const [type, setType] = React.useState('deposit')

  function handleCreateNewTransaction(event: React.FormEvent) {
    event.preventDefault()

    const data = {
      title,
      value,
      category,
      type
    }

    api.post('/transactions', data)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      overlayClassName="react-modal-overlay" 
      className="react-modal-content"
    >
      <button 
        type="button" 
        aria-label="Fechar" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <CloseIcon />
      </button>

      <S.Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
        />

        <S.TransactionTypeContainer>
          <S.RadionBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <IncomeIcon />
            <span>Entrada</span>
          </S.RadionBox>

          <S.RadionBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >

            <OutcomeIcon />
            <span>Saída</span>
          </S.RadionBox>

        </S.TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        />

        <button type="submit">Cadastrar</button>
      </S.Container>
    </Modal>
  );
};
