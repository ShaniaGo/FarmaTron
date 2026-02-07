<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('pedido_id')->constrained('pedidos');
            $table->foreignId('remitente_id')->constrained('usuarios');
            $table->foreignId('destinatario_id')->constrained('usuarios');

            // Mensaje
            $table->text('mensaje');
            $table->enum('tipo', ['texto', 'imagen', 'audio', 'documento'])->default('texto');
            $table->string('archivo_url')->nullable();
            $table->boolean('leido')->default(false);

            $table->timestamp('fecha_envio')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
