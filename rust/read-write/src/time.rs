use std::io::{self, Write};
use std::time::Instant;

fn time() -> Result<(), Box<dyn std::error::Error>> {
    let iterations = 10000;
    
    println!("Testing stdout performance with {} iterations", iterations);
    println!("---");
    
    // Test 1: Using println! (no explicit locking)
    println!("Test 1: Using println! macro");
    let start = Instant::now();
    
    for i in 0..iterations {
        println!("Line number: {}", i);
    }
    
    let duration1 = start.elapsed();
    println!("Time taken with println!: {:?}", duration1);
    println!("---");
    
    // Test 2: Using stdout.lock()
    println!("Test 2: Using stdout.lock()");
    let start = Instant::now();
    
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    
    for i in 0..iterations {
        writeln!(handle, "Line number: {}", i)?;
    }
    
    let duration2 = start.elapsed();
    println!("Time taken with stdout.lock(): {:?}", duration2);
    println!("---");
    
    // Test 3: Using BufWriter with stdout.lock()
    println!("Test 3: Using BufWriter + stdout.lock()");
    let start = Instant::now();
    
    let stdout = io::stdout();
    let mut handle = io::BufWriter::new(stdout.lock());
    
    for i in 0..iterations {
        writeln!(handle, "Line number: {}", i)?;
    }
    
    let duration3 = start.elapsed();
    println!("Time taken with BufWriter + lock: {:?}", duration3);
    println!("---");
    
    // Performance comparison
    println!("Performance comparison:");
    println!("println! macro:           {:?}", duration1);
    println!("stdout.lock():           {:?}", duration2);
    println!("BufWriter + lock:        {:?}", duration3);
    
    if duration2 < duration1 {
        println!("stdout.lock() was {:.2}x faster than println!", 
                 duration1.as_nanos() as f64 / duration2.as_nanos() as f64);
    }
    
    if duration3 < duration2 {
        println!("BufWriter was {:.2}x faster than plain lock!", 
                 duration2.as_nanos() as f64 / duration3.as_nanos() as f64);
    }
    
    Ok(())
}

// Add a main function to call time()
fn main() {
    if let Err(e) = time() {
        eprintln!("Error: {}", e);
    }time();
}