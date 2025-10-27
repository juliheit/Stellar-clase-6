#![cfg(test)]

use crate::{TokenBDB, TokenBDBClient};
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let name = String::from_str(&env, "Buen Dia Token");
    let symbol = String::from_str(&env, "BDB");
    let decimals = 7u32;
    
    // Inicializar el token
    client.initialize(&admin, &name, &symbol, &decimals);
    
    // Verificar metadatos
    assert_eq!(client.name(), name);
    assert_eq!(client.symbol(), symbol);
    assert_eq!(client.decimals(), decimals);
    assert_eq!(client.total_supply(), 0);
    assert_eq!(client.admin(), admin);
}

#[test]
fn test_mint_and_balance() {
    let env = Env::default();
    env.mock_all_auths();
    
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Inicializar
    client.initialize(
        &admin,
        &String::from_str(&env, "Test Token"),
        &String::from_str(&env, "TST"),
        &7u32
    );
    
    // Mintear tokens
    let amount = 1000_0000000i128; // 1000 tokens con 7 decimales
    client.mint(&user, &amount);
    
    // Verificar balance
    assert_eq!(client.balance(&user), amount);
    assert_eq!(client.total_supply(), amount);
}

#[test]
fn test_transfer() {
    let env = Env::default();
    env.mock_all_auths();
    
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    
    // Inicializar
    client.initialize(
        &admin,
        &String::from_str(&env, "Test Token"),
        &String::from_str(&env, "TST"),
        &7u32
    );
    
    // Mintear tokens a user1
    let amount = 1000_0000000i128;
    client.mint(&user1, &amount);
    
    // Transferir de user1 a user2
    let transfer_amount = 300_0000000i128;
    client.transfer(&user1, &user2, &transfer_amount);
    
    // Verificar balances
    assert_eq!(client.balance(&user1), amount - transfer_amount);
    assert_eq!(client.balance(&user2), transfer_amount);
    assert_eq!(client.total_supply(), amount);
}

