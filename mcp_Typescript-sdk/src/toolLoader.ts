import * as fs from "fs";
import * as path from "path";

export interface ToolDefinition {
    name: string;
    description: string;
    inputSchema: Record<string, any>;
    handler: (params: any) => Promise<any>;
}

export async function loadTools(): Promise<ToolDefinition[]> {
    const toolsDir = path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "./tools"
    );
    
    if (!fs.existsSync(toolsDir)) {
        console.warn(`Tools directory not found: ${toolsDir}`);
        return [];
    }
    
    const tools: ToolDefinition[] = [];
    const toolFiles = fs.readdirSync(toolsDir).filter(file => 
        file.endsWith('.js') || file.endsWith('.ts')
    );
    
    for (const file of toolFiles) {
        try {
            const toolPath = path.join(toolsDir, file);
            const toolModule = await import(toolPath);
            
            // Each tool file should export a default function that returns tool definitions
            if (typeof toolModule.default === 'function') {
                const toolDefs = await toolModule.default();
                if (Array.isArray(toolDefs)) {
                    tools.push(...toolDefs);
                } else {
                    tools.push(toolDefs);
                }
            }
        } catch (error) {
            console.error(`Error loading tool file ${file}:`, error);
        }
    }
    
    return tools;
}
