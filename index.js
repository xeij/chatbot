import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
   console.log(colors.bold.green("Welcome to the ChatBot"));

    while(true){
        const userInput = readlineSync.question(colors.yellow("Me: "));

        if(userInput.toLowerCase() === "exit"){
            console.log(colors.green('Bot: ' )+ completionText);

            return;
        }
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-004", // Hypothetical model name for v4; adjust based on actual model names
                prompt: userInput,
                max_tokens: 150, // Example parameter, adjust based on actual use case
                n: 1, // Get a single response (adjust as needed)
                stop: null, // Define any stopping conditions if necessary
              });
        
              const completionText = completion.data.choices[0].text;
              console.log(colors.green('Bot: ') + completionText);
        
        } catch (error) {
            console.error(colors.red(error));
        }
        
    }
}

main();
