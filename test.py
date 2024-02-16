emotes = "abc 142 209 252 aab 247 141 167 aae 225 029 072 aaa 000 208 132 aaf 252 185 000 nil nil nil nil nil ######################################################"

print(len(emotes))

emotesEnd = False
i = 0;

while not emotesEnd and i < 100:
    # if "nil" == emotes[i:i + 3]:
    #     emotesEnd = True
    # else:
        # Reaction storage nEmote = nGroup.reactions.push();
    a = emotes[i:i + 3];
    b = emotes[i + 4:i + 16]
    print(f"name : {a}, color : {b}")
    
    i += 16
