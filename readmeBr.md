# Busca de Chaves Bitcoin

Um simples gerador de chaves Bitcoin construído com PHP, JavaScript e HTML. Este projeto usa uma lista de palavras para gerar 12 palavras aleatórias e, a partir disso, obtém chaves privadas. A chave pública correspondente é então verificada quanto a saldos atuais e passados.

## Tecnologias Utilizadas

- **PHP**: Utilizado para realizar a lógica do lado do servidor e comunicar-se com APIs externas.
- **JavaScript**: Utilizado para interação do usuário e solicitações AJAX.
- **HTML/CSS**: Utilizado para a interface do usuário.

## Funcionalidades

- Geração de 12 palavras aleatórias a partir de uma lista de 2048 palavras.
- Recuperação de chaves privadas a partir das palavras geradas.
- Verificação de saldos atuais e passados com base na chave pública.

## Impacto

Este projeto demonstra a vulnerabilidade das carteiras de criptomoedas quando usam chaves fracas ou facilmente previsíveis. Por outro lado, também serve como uma ferramenta educacional para demonstrar como as carteiras de criptomoedas funcionam e a importância de uma chave segura.

## Melhorias Não Implementadas

1. **Implementação de mais medidas de segurança**: No seu estado atual, o projeto não implementa várias medidas de segurança que seriam apropriadas para o manuseio de chaves de carteira.
2. **Otimização de desempenho**: O projeto atualmente faz várias solicitações de API para cada chave gerada, o que poderia ser otimizado.
3. **Interface do usuário melhorada**: A interface do usuário atual é bastante básica e poderia ser melhorada para uma melhor experiência do usuário.
4. **Internacionalização**: O projeto está atualmente disponível apenas em inglês.

## Contribuindo

Agradecemos contribuições de qualquer tipo. Sinta-se à vontade para fazer um fork e abrir uma solicitação pull, ou simplesmente abrir uma issue para discutir possíveis melhorias.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
