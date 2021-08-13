describe('Registration screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19006/')
    cy.contains(/создать/i).click()
    cy.get('input').eq(2).as('email')
    cy.get('input[type=password]').last().as('password')
    cy.get('input').eq(4).as('confirmPassword')
  })

  it('Correct shows email errors', () => {
    cy.get('@email').type('t')
    cy.get('@email').blur()
    cy.contains(/некорректный email/i)
    cy.get('div[role=button][aria-disabled=true]').should('exist')

    cy.get('@email').type('test@test.test')
    cy.get('@email').blur()
    cy.contains(/некорректный email/i).should('not.exist')
  })
  it('Correct shows password errors', () => {
    cy.get('@password').type('t')
    cy.get('@password').blur()
    cy.contains(/пароль должен быть длиннее 6 символов/i)
    cy.contains(/пароли не совпадают/i)
    cy.get('div[role=button][aria-disabled=true]').should('exist')

    cy.get('@password').type('testPassword')
    cy.get('@password').blur()
    cy.contains(/пароли не совпадают/i)
    cy.contains(/пароль должен быть длиннее 6 символов/i).should('not.exist')
  })
  it('Correct compare passwords', () => {
    cy.get('@password').type('testPassword')
    cy.get('@confirmPassword').type('testPassword')
    cy.contains(/пароли не совпадают/i).should('not.exist')

    cy.get('@confirmPassword').type('t')
    cy.get('@confirmPassword').blur()
    cy.contains(/пароли не совпадают/i)

    cy.get('@password').type('t')
    cy.get('@password').blur()
    cy.contains(/пароли не совпадают/i).should('not.exist')
  })
  it('Correct shows button', () => {
    cy.get('div[role=button][aria-disabled=true]').should('exist')
  })

  it('Enables login when form valid', () => {
    cy.get('@email').type('test@test.test')
    cy.get('@password').type('password')
    cy.get('@confirmPassword').type('password')
    cy.get('div[role=button]').invoke('attr', 'aria-disabled').should('not.exist')
  })
})
