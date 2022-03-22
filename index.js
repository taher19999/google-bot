import sys
import time
import telepot
from telegram import Message, Chat, Update, Bot, User

import math
from telepot.namedtuple import InlineKeyboardMarkup, InlineKeyboardButton
from telepot.loop import MessageLoop

numbers={}
cntr=0
flagOfDo=0
result=1

def handle(msg):
    global flagOfLevel
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text='احسب', callback_data='1')]
    ])
    content_type, chat_type, chat_id = telepot.glance(msg)
#    print(msg)

    global flagOfDo
    global cntr
    global result
    
    if msg['text']=='/start':
        bot.sendMessage(chat_id,"(Tmax in motor indction)🧲مرحبا بك😇 في بوت حاسبة اعظم عزم للماطور الحثي"
"\n (E1=400/√3 ) :الجهد التطبيقي  في سوال يكون لاين لذلك يجب تحويلة للفيز  \n"        
"\nقانون السرعة التزامنية :Ns=120*Fs/p \n"
"\n (E2=K*E1 ) :ستنادستيل أي أم أف المحتثة  \n"
"\n (Tmax=3/2⨉πNs⨉E2^2/2⨉X2 ) :قانون اعظم عزم  \n"
"\nمطور البوت:@taher_ja9👨‍💻\n"
"\n هيا لنبدا 👇👇\n"
"\n (fs)الان أرسل التردد\n")

        flagOfDo=1
        cntr=0
        return
        
    numbers[cntr]=float(msg['text'])
    
    if cntr==7:
        bot.sendMessage(chat_id,'اضغط على احسب , وذا جنت بمجموعة راقب خاص',reply_markup=keyboard)
        cntr=0
        result=0
    
    if result==1:
        if flagOfDo==1:
            bot.sendMessage(chat_id,'(Number Of Poles 🅿) :ارسل عدد الأقطاب ')
            flagOfDo=2
            cntr=1
            return
    if result==1:
        if flagOfDo==2:
            bot.sendMessage(chat_id,'(ratio of stator to rotor turns"K" )أرسل  نسبة الجزء الثابت الى متحرك ')
            flagOfDo=3
            cntr=2
            return  
    if result==1:
        if flagOfDo==3:
            bot.sendMessage(chat_id,': (E1) أرسل قيمة فولطية الفيز')
            flagOfDo=4
            cntr=3
            return  
    if result==1:
        if flagOfDo==4:
            bot.sendMessage(chat_id,': (X2)إرسل قيمة الممانعة ')
            flagOfDo=5
            cntr=4
            return
    if result==1:
        if flagOfDo==5:
            bot.sendMessage(chat_id,':(R2)أرسل قيمة المقاومة   اختياري في حال ما دخلت بحساباتك اهملها خل اي قيمة')
            flagOfDo=6
            cntr=5
            return            
    if result==1:
        if flagOfDo==6:
            bot.sendMessage(chat_id,':(N)أرسل قيمة السرعة اختياري  اذا ما موجودة بسوال خل اي قيمة ما يهم')
            flagOfDo=7
            cntr=6
            return   
    if result==1:
        if flagOfDo==7:
            bot.sendMessage(chat_id,':(friction losse)أرسل  قيمة خسائر الاحتكاك  اذا منطيها بسوال واذا خلي اي رقم')
            flagOfDo=0
            cntr=7
            return                                
        else:
            bot.sendMessage(chat_id,'أرسل التردد f  تردد مرات ثابت 50 ')
            flagOfDo=1
            return
#     bot.sendMessage(chat_id, message)




def on_callback_query(msg):
	
    query_id, from_id, query_data=telepot.glance(msg, flavor='callback_query')    
    #    print(msg)
    global result
    global numbers

    if query_data=='0':
        bot.sendMessage(from_id,'لتحديث بوت اضغط /start',reply_markup=keyboard)
        numbers={}
        
    elif query_data=='1':
        bot.sendMessage(from_id,'Ns(r.p.m): ''=' + str((120*numbers[0])/(numbers[1])))
        bot.sendMessage(from_id,'Ns(r.p.s): ''=' + str((120*numbers[0])/(numbers[1])/60))
        bot.sendMessage(from_id,'E2: ''=' + str((math.pow(((numbers[3])/(math.sqrt(3))/numbers[2]),2)))) 
        bot.sendMessage(from_id,'✅ Tf: ''=' + str(((3)/((2*math.pi)*((120*numbers[0])/(numbers[1])/60))*(((((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1])))*(math.pow(numbers[2]*((numbers[3])/(1.73)),2))*numbers[5])/((math.pow(numbers[5],2))+(math.pow(((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[4],2)))))))
        bot.sendMessage(from_id,'✅ Tmax: ''=' + str((3)/((2*math.pi)*((120*numbers[0])/(numbers[1])/60))*((math.pow(((numbers[3])/(math.sqrt(3))/numbers[2]),2))/(2*numbers[4]))))
        bot.sendMessage(from_id,'في حال وجود محث✅ Tmax: ''=' + str(((3)/((2*math.pi)*((120*numbers[0])/(numbers[1])/60))*(((numbers[5])/(numbers[4])*(math.pow(numbers[2]*((numbers[3])/(1.73)),2))*numbers[5])/((math.pow(numbers[5],2))+(math.pow((numbers[5])/(numbers[4])*numbers[4],2)))))))
        bot.sendMessage(from_id,'s: ''=' + str(((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1]))))
        bot.sendMessage(from_id,'✅Ir: ''=' + str((((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[2]*((numbers[3])/(1.73)))/(math.sqrt(math.pow(numbers[5],2)+math.pow(((120*numbers[0])/(numbers[1])-numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[4],2)))))
        bot.sendMessage(from_id,'Total Cu loss: ''=' + str((3*(math.pow((((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[2]*((numbers[3])/(1.73)))/(math.sqrt(math.pow(numbers[5],2)+math.pow(((120*numbers[0])/(numbers[1])-numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[4],2))),2)*numbers[5]))))
        bot.sendMessage(from_id,'🌚Pout: ''=' + str((6.28)*((numbers[6])/(60))*((3)/((2*math.pi)*((120*numbers[0])/(numbers[1])/60))*(((((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1])))*(math.pow(numbers[2]*((numbers[3])/(1.73)),2))*numbers[5])/((math.pow(numbers[5],2))+(math.pow(((120*numbers[0])/(numbers[1])- numbers[6])/((120*numbers[0])/(numbers[1]))*numbers[4],2)))))))

        bot.sendMessage(from_id,'لتحديث بوت اضغط /start')
        result=1
        numbers={}
        
    else:
        bot.sendMessage(from_id,'أعد المحاولة')
        result=1
        bot.sendMessage(from_id,'لتحديث بوت اضغط /start')
       	   
bot = telepot.Bot('5152818658:AAE5vTlhrtNnJCAoA_zrTYhagbNWfHicF8M')
MessageLoop(bot, {'chat': handle,
                  'callback_query': on_callback_query}).run_as_thread()
print ('Listening ...')

while 1:
    time.sleep(10)
