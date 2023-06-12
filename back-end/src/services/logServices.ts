import supabase from "../lib/supabase"

export const addLogToSupabase = async ({
    timestamp,
    level,
    message
} : {
    timestamp: string,
    level: 'INFO' | 'WARN' | 'ERROR',
    message: string
}) => {
    const { error } = await supabase.from('logs').insert({
        timestamp,
        level,
        message
    })
    if (error) {
        throw error
    }
}