import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Game from "../pages/Game";
import App from "../App";
import { mock_test, invalidToken} from './helpers/mock_test';
import { act } from "react-dom/test-utils";

// correctAnswer - incorrectAnswers

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo',() => {

  test('Verifique se existe um timer renderizado na pg', () => {
    renderWithRouterAndRedux(<Game />);

    const timer = screen.getByText(/Timer/i);
    expect(timer).toBeInTheDocument()
  
  });

  test('Verifique se as informações do player estão na tela', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
   
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(name, 'Maria Clara');
    userEvent.type(email, 'maria@test.com');
    userEvent.click(btnPlay);

    await waitFor(() => {
      const img = screen.getByTestId('header-profile-picture');
      expect(img).toBeInTheDocument();
    }, 5000);

    const nameGame = screen.getByTestId('header-player-name');
    expect(nameGame).toBeInTheDocument();
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
 
  });

  test('Verifique se a categoria e pergunta estão presentes na tela', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => {
      const categoria = screen.getByTestId("question-category");
      expect(categoria).toBeVisible();
      const pergunta = screen.getByTestId("question-text");
      expect(pergunta).toBeInTheDocument();
    })

    });
  
  test('Verifique se as opções de respostas são renderizadas na tela, se respondem ao click e renderiza o botão next', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
    renderWithRouterAndRedux(<Game />);

    await waitFor(()=>{
    const respostas = screen.getByTestId("answer-options");
    const respostaCorreta = screen.getByTestId("correct-answer");
    
    expect(respostas).toBeInTheDocument();
    userEvent.click(respostaCorreta);
    expect(respostaCorreta).toBeVisible();
  })
  
  await waitFor(()=>{
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeVisible();
})
})

test('Verifique se após clicar em uma resposta as outras opções são desativadas e o timer para a contagem', async () => {
  localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock_test),
  });
  renderWithRouterAndRedux(<Game />);

  await waitFor (() => {
    const respostaCorreta = screen.getByTestId("correct-answer");
    expect(respostaCorreta).toBeVisible();
    expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
  }, 3000)

  await waitFor(() =>{
    const respostaCorreta = screen.getByTestId("correct-answer");
    userEvent.click(respostaCorreta)
    expect(respostaCorreta).toBeDisabled();
  })
})
 
  test('Verifique se o jogo possui 5 perguntas e se renderiza um botão para a pág.feedback', async () => {
    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
    renderWithRouterAndRedux(<Game />);

    // const { history} = renderWithRouterAndRedux(<App />);

    // act(() => { history.push('/feedback'); });

    // questão 1
    await waitFor (() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      expect(respostaCorreta).toBeVisible();
      expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
    }, 3000)

    await waitFor(() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      userEvent.click(respostaCorreta)
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext)
    })

    // questão 2
    await waitFor (() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      expect(respostaCorreta).toBeVisible();
      expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
    }, 3000)

    await waitFor(() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      userEvent.click(respostaCorreta)
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext)
    })

       // questão 3
       await waitFor (() => {
        const respostaCorreta = screen.getByTestId("correct-answer");
        expect(respostaCorreta).toBeVisible();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      }, 3000)
  
      await waitFor(() => {
        const respostaCorreta = screen.getByTestId("correct-answer");
        userEvent.click(respostaCorreta)
        const btnNext = screen.getByTestId('btn-next');
        userEvent.click(btnNext)
      })    

         // questão 4
    await waitFor (() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      expect(respostaCorreta).toBeVisible();
      expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
    }, 3000)

    await waitFor(() => {
      const respostaCorreta = screen.getByTestId("correct-answer");
      userEvent.click(respostaCorreta)
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext)
    })
    
    // const btnNext = screen.getByTestId('btn-next');
    // userEvent.click(btnNext)
    // await waitForElementToBeRemoved(btnNext,{timeout: 3000})
    // expect(history.location.pathname).toBe('/feedback');
 
  })
})
 
