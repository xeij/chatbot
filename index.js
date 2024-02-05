import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){

    console.log(colors.bold.green("Welcome to the ChatBot"));

    const chatHistory = [];

    while(true){
        const userInput = readlineSync.question(colors.yellow("Me: "));

        if(userInput.toLowerCase() === "exit"){
            //console.log(colors.green('Bot: ' )+ completionText);

            return;
        }
        try {

            const messages = chatHistory.map(([role, content]) => ({role, content}));
            messages.push({role: 'user', content: userInput});

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": userInput}],

              });
              const completionText = completion.choices[0].message.content;
              console.log(colors.green('Bot: ') + completionText);
              
              chatHistory.push(['user', userInput]);
              chatHistory.push(['assistant', completionText]);
              
        
        } catch (error) {
            
            if (error instanceof OpenAI.APIError) {
                console.error(colors.red('API Error: '), error.message);
            } else {
                console.error(colors.red('Error: '), error);
            }
        }      
    }
}

main();