# Bitcoin Key Private Find

A simple Bitcoin key generator built with PHP, JavaScript, and HTML. This project uses a wordlist to generate 12 random words, and from that obtains private keys. The corresponding public key is then checked for current and past balances.

## Technologies Used

- **PHP**: Used to perform server-side logic and communicate with external APIs.
- **JavaScript**: Used for user interaction and AJAX requests.
- **HTML/CSS**: Used for the user interface.

## Features

- Generation of 12 random words from a list of 2048 words.
- Retrieval of private keys from the generated words.
- Verification of current and past balances based on the public key.

## Impact

This project demonstrates the vulnerability of cryptocurrency wallets when they use weak or easily predictable keys. On the other hand, it also serves as an educational tool to demonstrate how cryptocurrency wallets work and the importance of a secure key.

## Non-Implemented Improvements

1. **Implementation of more security measures**: In its current state, the project does not implement various security measures that would be appropriate for handling wallet keys.
2. **Performance optimization**: The project currently makes multiple API requests for each generated key, which could be optimized.
3. **Improved user interface**: The current user interface is quite basic and could be improved for a better user experience.
4. **Internationalization**: The project is currently only available in English.

## Contributing

We welcome contributions of any kind. Feel free to fork and open a pull request, or just open an issue to discuss possible improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
