package com.wks.packet.data;

import com.wks.packet.Command;
import lombok.Data;

@Data
public class LoginResponseData implements EncodeData{

    private Boolean isSuccessful;

    private Integer code;

    public LoginResponseData(Boolean isSuccessful, Integer code) {
        this.isSuccessful = isSuccessful;
        this.code = code;
    }


    @Override
    public byte getCommand() {
        return Command.LOGIN_RESPONSE;
    }
}
