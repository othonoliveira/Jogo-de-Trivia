import App from "../App";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from "react-dom/test-utils";

describe('Verifica se os testes possuem cobertura > 90%', () => {
  test('Teste se a página possui um input de nome e email', () => {
    renderWithRouterAndRedux(<App />);
    const namePlayer = screen.getByTestId('input-player-name');
    expect(namePlayer).toBeInTheDocument();
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    expect(emailPlayer).toBeInTheDocument();
  });
  test('Teste se é renderizado um botão com o texto Play', () => {
    renderWithRouterAndRedux(<App />);
      const btnPlay = screen.getByRole('button', {name: /play/i});
      expect(btnPlay).toBeInTheDocument();
  });
  test('Teste se o botão play esta habilitado após o preenchimentos dos campos', async () => {
    renderWithRouterAndRedux(<App />);
    
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', {name: /play/i});
      userEvent.type(namePlayer, 'Maria Clara');
      userEvent.type(emailPlayer, 'maria@gmail.com');

      act(() => {
      userEvent.click(btnPlay);
    });   
  })

  test('Teste se o botão permanece desabilitado após o não preenchimento correto dos inputs', async () => {
  renderWithRouterAndRedux(<App />);
  const namePlayer = screen.getByTestId('input-player-name');
  const emailPlayer = screen.getByTestId('input-gravatar-email');
  const btnPlay = screen.getByRole('button', {name: /play/i});
    userEvent.type(namePlayer, '');
    userEvent.type(emailPlayer, 'maria@gmail.com');

    expect(btnPlay).toBeDisabled();
  });

  test('Teste se é renderizado um botão settings na tela de login e se o mesmo direciona para a página Settings ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSet = screen.getByTestId('btn-settings')
    expect(btnSet).toBeInTheDocument();
    userEvent.click(btnSet);
    expect(history.location.pathname).toBe('/configuracoes');
  });

  test('Teste se após clicar no botão play a página é redirecionada para a página do game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', {name: /play/i});
      userEvent.type(namePlayer, 'Maria Clara');
      userEvent.type(emailPlayer, 'maria@gmail.com');
      userEvent.click(btnPlay);

      await waitForElementToBeRemoved(btnPlay,{timeout: 2000}) //Ajuda monitoria Sumo
      expect(history.location.pathname).toBe('/game');

    });  
  });
  
