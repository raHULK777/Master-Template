#!/usr/bin/env node
/**
 * Santos Construction — Image Generation Script
 * 
 * Uses local SDXL model to generate high-quality promotional images.
 * 
 * Usage:
 *   node generate-image.js "prompt" [output_name]
 *   node generate-image.js --list          List predefined prompts
 *   node generate-image.js --generate-all  Generate all preset images
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// SDXL paths
const SD_CLI_PATH = path.join('D:', 'Projects', 'remotionclips', '.local', 'sd', 'sd-cli.exe');
const MODEL_PATH = path.join('D:', 'Projects', 'remotionclips', '.local', 'sd', 'sd_xl_base_1.0.safetensors');
const OUTPUT_DIR = path.join(__dirname, '..', 'generated');
const SANTOS_PUBLIC_DIR = path.join(__dirname, '..', 'public', 'santos');

// Ensure directories exist
[OUTPUT_DIR, SANTOS_PUBLIC_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Default parameters for high-quality image generation
const DEFAULT_PARAMS = {
  width: 1024,
  height: 768,
  steps: 30,
  cfgScale: 7.5,
  sampler: 'euler_a',
  scheduler: 'karras',
  seed: -1,
};

/**
 * Generate an image using SDXL CLI
 */
function generateImage(prompt, outputName, options = {}) {
  const params = { ...DEFAULT_PARAMS, ...options };
  
  console.log(`\n🎨 Generating image...`);
  console.log(`   Prompt: ${prompt}`);
  console.log(`   Output: ${outputName}.png`);
  console.log(`   Size: ${params.width}x${params.height}`);
  console.log(`   Steps: ${params.steps}`);
  
  return new Promise((resolve, reject) => {
    const args = [
      '-m', MODEL_PATH,
      '-p', prompt,
      '-o', path.join(OUTPUT_DIR, `${outputName}.png`),
      '--width', params.width.toString(),
      '--height', params.height.toString(),
      '--steps', params.steps.toString(),
      '--cfg-scale', params.cfgScale.toString(),
      '--sampling-method', params.sampler,
      '--scheduler', params.scheduler,
      '--verbose'
    ];
    
    if (params.seed >= 0) {
      args.push('--seed', params.seed.toString());
    }
    
    const proc = spawn(SD_CLI_PATH, args, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        // Copy to public/santos
        const outputPath = path.join(OUTPUT_DIR, `${outputName}.png`);
        const finalPath = path.join(SANTOS_PUBLIC_DIR, `${outputName}.png`);
        
        if (fs.existsSync(outputPath)) {
          fs.copyFileSync(outputPath, finalPath);
          console.log(`\n✅ Image saved to: ${finalPath}`);
        }
        resolve({ success: true, path: finalPath });
      } else {
        console.error(`\n❌ Generation failed with code ${code}`);
        reject(new Error(`Generation failed with code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      console.error(`\n❌ Failed to start generation: ${err.message}`);
      reject(err);
    });
  });
}

/**
 * Predefined prompts for Santos Construction website
 */
const PROMPTS = {
  heroSkyline: {
    name: 'hero-skyline',
    prompt: `Dallas Texas skyline at golden hour, dramatic sunset with orange and purple clouds, modern skyscrapers, construction crane silhouettes in foreground, professional architectural photography, 8K quality, cinematic lighting, wide angle shot`,
    width: 1920,
    height: 1080,
  },
  crewOnSite: {
    name: 'crew-on-site',
    prompt: `Professional construction crew working together on residential home renovation, diverse team of contractors in safety vests and hard hats, focused expression, authentic documentary photography, sunny day, suburban Dallas neighborhood, candid moment`,
    width: 1024,
    height: 768,
  },
  beforeVaultedCeiling: {
    name: 'before-vaulted-ceiling',
    prompt: `Damaged vaulted ceiling in living room, water damage stains, cracked drywall, exposed insulation, needs renovation, realistic interior photography, natural lighting, before remodel condition`,
    width: 1024,
    height: 768,
  },
  afterVaultedCeiling: {
    name: 'after-vaulted-ceiling',
    prompt: `Beautiful restored vaulted ceiling, smooth white drywall, perfect texture match, clean painted finish, bright modern living room, after renovation, professional interior photography, aspirational home design`,
    width: 1024,
    height: 768,
  },
  beforeStreetDriveway: {
    name: 'before-street-driveway',
    prompt: `Cracked and uneven concrete driveway and street, potholes, weathered surface, residential neighborhood needs repair, realistic outdoor photography, overcast day`,
    width: 1024,
    height: 768,
  },
  afterStreetDriveway: {
    name: 'after-street-driveway',
    prompt: `Brand new smooth concrete driveway and street, fresh poured asphalt, clean lines, newly paved residential road, suburban Dallas neighborhood, professional concrete work, sunny day`,
    width: 1024,
    height: 768,
  },
  beforeKitchen: {
    name: 'before-kitchen',
    prompt: `Old dated kitchen renovation needed, worn cabinets, outdated countertops, tired space, before remodel condition, realistic interior photography`,
    width: 1024,
    height: 768,
  },
  afterKitchen: {
    name: 'after-kitchen',
    prompt: `Stunning modern kitchen remodel, quartz countertops, shaker cabinets, subway tile backsplash, pendant lighting, island with bar stools, aspirational interior design, professional photography`,
    width: 1024,
    height: 768,
  },
  heroConcrete: {
    name: 'hero-concrete',
    prompt: `Professional concrete driveway being poured, smooth finished surface, wet concrete glistening, construction equipment in background, golden hour lighting, wide angle architectural photography`,
    width: 1024,
    height: 768,
  },
  heroCrew: {
    name: 'hero-crew',
    prompt: `Small confident construction team standing together on job site, arms crossed, proud expressions, safety gear, residential project background, authentic documentary style, golden hour`,
    width: 1024,
    height: 768,
  },
};

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🏗️  Santos Construction Image Generator
  
Usage:
  node generate-image.js "prompt" [output_name]
  node generate-image.js --list          List predefined prompts
  node generate-image.js --generate-all  Generate all preset images
  
Examples:
  node generate-image.js "Your custom prompt here" my-image
  node generate-image.js --generate-all
    `);
    return;
  }
  
  if (args[0] === '--list') {
    console.log('\n📋 Available Preset Prompts:\n');
    Object.entries(PROMPTS).forEach(([key, value]) => {
      console.log(`  ${key.padEnd(20)} → ${value.name}.png`);
      console.log(`    Prompt: ${value.prompt.substring(0, 80)}...`);
      console.log(`    Size: ${value.width}x${value.height}\n`);
    });
    return;
  }
  
  if (args[0] === '--generate-all') {
    console.log('\n🚀 Generating all preset images...\n');
    const results = [];
    for (const [key, config] of Object.entries(PROMPTS)) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Generating: ${key}`);
      console.log('='.repeat(60));
      try {
        const result = await generateImage(config.prompt, config.name, {
          width: config.width,
          height: config.height,
        });
        results.push({ key, ...result });
      } catch (error) {
        results.push({ key, success: false, error: error.message });
      }
    }
    console.log(`\n${'='.repeat(60)}`);
    console.log('Generation Complete!');
    console.log('='.repeat(60));
    const successes = results.filter(r => r.success).length;
    console.log(`Success: ${successes}/${results.length}`);
    return;
  }
  
  // Custom prompt
  const prompt = args[0];
  const outputName = args[1] || `image-${Date.now()}`;
  
  try {
    await generateImage(prompt, outputName);
  } catch (error) {
    process.exit(1);
  }
}

main();
