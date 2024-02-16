from sympy import randprime, primitive_root

def generate_primitive_element(bit_length):
    # Generate a large prime
    prime = randprime(2**(bit_length-1), 2**bit_length)

    # Find a primitive element modulo the prime
    primitive_element = primitive_root(prime)

    return primitive_element, prime

alpha = 0

while alpha <= 2:
    bit_length = 256  # Adjust this according to your requirements
    primitive_element, prime = generate_primitive_element(bit_length)
    print("\n\n\nPrimitive element:", primitive_element)
    print("Prime modulus:", prime)
    alpha = primitive_element
