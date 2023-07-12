import supabase from "../lib/supabase"

export const addLogToSupabase = async ({
    timestamp,
    level,
    app,
    message
} : {
    timestamp: string,
    level: 'INFO' | 'WARN' | 'ERROR',
    app: string,
    message: string
}) => {
    console.log(level)
    const { error } = await supabase.from('logs').insert({
        timestamp,
        level,
        app,
        message
    })
    if (error) {
        throw error
    }
}

export const getLogsFromSupabase = async () => {
    const { data, error } = await supabase.from('logs').select('*')
    if (error) {
        throw error
    }
    return data
}