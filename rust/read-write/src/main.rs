use clap::{Error, Parser};

#[derive(Parser)]
struct Cli{
   path:std::path::PathBuf
}

fn main()->Result<(),Box<dyn std::error::Error>>{
    let args = Cli::parse();
    let content = std::fs::read_to_string("main.txt");

   let result = match content {
       Ok(content) => {content},
       Err(error) => { panic!("Can't deal with {:?}, just exit here", error); }
   };




   println!("result: {:?}", result);
   Ok(())

}

// fn get_first_word(sentence:String)-> String{
//    let mut ans = String::from("");
//    for char in sentence.chars(){
//       if char == ' '{
//          break;
//       }
//       ans.push(char);
//    }
//    return ans;
// }

